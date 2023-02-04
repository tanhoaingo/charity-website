package com.charity.charitysupport.repository;

import java.util.Optional;

import com.charity.charitysupport.entity.VerificationToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationToken, Long>{
    Optional<VerificationToken> findByToken(String token);
}
