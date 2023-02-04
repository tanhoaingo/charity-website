package com.charity.charitysupport.repository;

import com.charity.charitysupport.entity.Image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
    
}
