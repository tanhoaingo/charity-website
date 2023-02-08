package com.charity.charitysupport.security;

import java.time.Instant;
import java.util.Date;

import com.charity.charitysupport.entity.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtProvider {

    @Value(value = "${jwt.app.name}")
    private String appName;
    @Value(value = "${jwt.secret.key}")
    private String secretKey;
    @Value(value = "${jwt.expiration.time}")
    private Long expirationTime;
    private SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    public String generateToken(Authentication auth) {
        User principal = (User) auth.getPrincipal();
        return Jwts.builder().setIssuer(appName).setSubject(principal.getUsername())
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plusMillis(expirationTime)))
                .signWith(SIGNATURE_ALGORITHM, secretKey).compact();
    }

    public Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    public String getUsernameFromJwtToken(String token) {
        String username;
        try {
            username = getAllClaimsFromToken(token).getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    public String generateTokenWithUsername(String username) {
        return Jwts.builder().setIssuer(appName).setSubject(username)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plusMillis(expirationTime)))
                .signWith(SIGNATURE_ALGORITHM, secretKey).compact();
    }

    public Long getExpirationTime() {
        return this.expirationTime;
    }

}
