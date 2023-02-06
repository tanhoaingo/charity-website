package com.charity.charitysupport.controller;

import com.charity.charitysupport.DTO.AuthenticationResponse;
import com.charity.charitysupport.DTO.LoginRequest;
import com.charity.charitysupport.DTO.Profile;
import com.charity.charitysupport.DTO.RefreshTokenRequest;
import com.charity.charitysupport.DTO.RegisterRequest;
import com.charity.charitysupport.service.AuthService;
import com.charity.charitysupport.service.RefreshTokenService;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody RegisterRequest request) {
        authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Kiểm tra mail để kích hoạt tài khoản của bạn");
    }

    @GetMapping("/accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        authService.verifyAccount(token);
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:3001/login")).build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(loginRequest));
    }

    @PostMapping("/refresh/token")
    public ResponseEntity<AuthenticationResponse> refresh(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.refresh(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody RefreshTokenRequest request) {
        refreshTokenService.deleteToken(request.getToken());
        return ResponseEntity.status(HttpStatus.OK).body("Refresh token đã được xoá thành công");
    }

    @GetMapping("/role")
    public ResponseEntity<Boolean> isAdmin() {
        return ResponseEntity.status(HttpStatus.OK).body(authService.isAdmin());
    }

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile() {
        Profile profile = authService.getProfile();
        return profile == null ? ResponseEntity.status(HttpStatus.valueOf(204)).body(profile)
                : ResponseEntity.status(HttpStatus.valueOf(200)).body(profile);
    }

    @GetMapping("/isLoggin")
    public ResponseEntity<Boolean> isLoggin(){
        return ResponseEntity.status(HttpStatus.OK).body(authService.isLoggedIn());
    }

}
