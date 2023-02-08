package com.charity.charitysupport.service;

import java.time.Instant;
import java.util.Random;
import java.util.UUID;

import com.charity.charitysupport.DTO.AuthenticationResponse;
import com.charity.charitysupport.DTO.Profile;
import com.charity.charitysupport.DTO.LoginRequest;
import com.charity.charitysupport.DTO.NotificationMail;
import com.charity.charitysupport.DTO.RefreshTokenRequest;
import com.charity.charitysupport.DTO.RegisterRequest;
import com.charity.charitysupport.entity.User;
import com.charity.charitysupport.entity.VerificationToken;
import com.charity.charitysupport.repository.UserRepository;
import com.charity.charitysupport.repository.VerificationRepository;
import com.charity.charitysupport.security.JwtProvider;

import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final MailService mailService;
    private final Environment environment;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;

    public void signup(RegisterRequest request) {
        User user = new User();

        user.setUsername(request.getUsername());
        user.setFullname(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAvatar(String.valueOf(request.getUsername().charAt(0)).toUpperCase() + new Random().nextInt(19) + ".svg");
        user.setEnable(false);

        userRepository.save(user);

        String token = generateVerificationToken(user);
        mailService.sendMail(new NotificationMail("Mã kích hoạt", user.getEmail(),
                "Cảm ơn vì đã đăng ký, vui lòng nhấp vào đường link bên dưới để kích hoạt tài khoản của bạn: "
                        + environment.getProperty("app.url") + "/auth/accountVerification/" + token));
    }

    public String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();

        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpirationTime(Instant.now().plusMillis(300000));

        verificationRepository.save(verificationToken);

        return token;
    }

    @Transactional
    public void verifyAccount(String token) {
        VerificationToken verificationToken = verificationRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid Token"));
        fetchUserAndEnable(verificationToken);
        verificationRepository.deleteById(verificationToken.getId());
    }

    private void fetchUserAndEnable(VerificationToken verificationToken) {
        String username = verificationToken.getUser().getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Not find out User with username: " + username));
        user.setEnable(true);
        userRepository.save(user);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtProvider.generateToken(auth);
        String refreshToken = refreshTokenService.generateToken();
        return new AuthenticationResponse(loginRequest.getUsername(), token, Instant.now().plusMillis(150000),
                refreshToken);
    }

    public AuthenticationResponse refresh(RefreshTokenRequest request) {
        refreshTokenService.validate(request.getToken());
        return new AuthenticationResponse(request.getUsername(),
                jwtProvider.generateTokenWithUsername(request.getUsername()),
                Instant.now().plusMillis(jwtProvider.getExpirationTime()), request.getToken());
    }

    public boolean isLoggedIn(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return !(auth instanceof AnonymousAuthenticationToken) && auth.isAuthenticated();
    }

    @Transactional(readOnly = true)
    public User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Profile getProfile(){
        if(!this.isLoggedIn()){
            return null;
        } else {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Profile profile = new Profile();
            profile.setUsername(user.getUsername());
            profile.setFullname(user.getFullname());
            profile.setEmail(user.getEmail());
            profile.setPhoneNumber(user.getPhoneNumber());
            profile.setAddress(user.getAddress());
            profile.setDescription(user.getDescription());
            profile.setAvatar(user.getAvatar());
            return profile; 
        }
    }
    public boolean isAdmin(){
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return user.getRole().equals("ADMIN");
        } catch (Exception e) {
            return false;
        }
    }

}
