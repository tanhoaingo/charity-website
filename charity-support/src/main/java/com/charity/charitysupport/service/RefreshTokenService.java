package com.charity.charitysupport.service;

import java.time.Instant;
import java.util.UUID;

import javax.transaction.Transactional;

import com.charity.charitysupport.entity.RefreshToken;
import com.charity.charitysupport.repository.RefreshTokenRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public String generateToken() {
        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setCreatedDate(Instant.now());

        refreshTokenRepository.save(refreshToken);

        return token;
    }

    public void validate(String token) {
        refreshTokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid Token!"));
    }

    public void deleteToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
