package com.charity.charitysupport.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.charity.charitysupport.DTO.ChangePasswordRequest;
import com.charity.charitysupport.DTO.DonationOfUser;
import com.charity.charitysupport.DTO.Profile;
import com.charity.charitysupport.entity.Donation;
import com.charity.charitysupport.entity.User;
import com.charity.charitysupport.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public void updateProfile(Profile profile) {
        User user = userRepository.findByUsername(profile.getUsername())
                .orElseThrow(() -> new RuntimeException("Can't find user with username: " + profile.getUsername()));

        user.setFullname(profile.getFullname());
        user.setAddress(profile.getAddress());
        user.setDescription(profile.getDescription());
        user.setAvatar(this.createAvatar(profile.getFullname()));

        userRepository.save(user);
    }

    public boolean updatePassword(ChangePasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Can't find user with username: " + request.getUsername()));
        if (passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            return true;
        } else
            return false;
    }

    public String createAvatar(String fullname) {
        String[] array = fullname.trim().replaceAll("( )+", " ").split(" ");
        String first = String.valueOf(array[0].charAt(0)).toUpperCase();
        String last = String.valueOf(array[array.length - 1].charAt(0)).toUpperCase();
        return array.length == 1 ? first + new Random().nextInt(19) + ".svg"
                : first + last + new Random().nextInt(19) + ".svg";
    }

    public List<DonationOfUser> getDonations() {
        User user = authService.getCurrentUser();
        List<DonationOfUser> list = new ArrayList<>();

        for (Donation donation : user.getDonations()) {
            byte[] img = donation.getPost().getImages().isEmpty() ? null
                        : PostService.decompressBytes( donation.getPost().getImages().get(0).getImgByte());
            list.add(new DonationOfUser(donation.getPost().getId(), donation.getPost().getTitle(), img,  donation.getPost().getOrganization(), donation.getAmount()));
        }

        return list;
    }
}
