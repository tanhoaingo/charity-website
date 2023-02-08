package com.charity.charitysupport.DTO;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String username;
    private String authenticationToken;
    private Instant expirationTime;
    private String refreshToken;
    
}
