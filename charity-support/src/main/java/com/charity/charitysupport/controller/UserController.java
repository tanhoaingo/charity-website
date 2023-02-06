package com.charity.charitysupport.controller;

import java.util.List;

import com.charity.charitysupport.DTO.ChangePasswordRequest;
import com.charity.charitysupport.DTO.DonationOfUser;
import com.charity.charitysupport.DTO.Profile;
import com.charity.charitysupport.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    
    @PutMapping("/profile/update")
    public ResponseEntity<Void> updateProfile(@RequestBody Profile profile){
        userService.updateProfile(profile);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/password/update")
    public ResponseEntity<Boolean> updatePassword(@RequestBody ChangePasswordRequest request){
        return ResponseEntity.status(HttpStatus.valueOf(200)).body(userService.updatePassword(request));
    }

    @GetMapping("/donations")
    public ResponseEntity<List<DonationOfUser>> getDonations(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getDonations());
    }
}
