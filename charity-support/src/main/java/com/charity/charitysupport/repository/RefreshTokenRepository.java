package com.charity.charitysupport.repository;

import java.util.Optional;

import com.charity.charitysupport.entity.RefreshToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>{
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
}
