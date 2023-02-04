package com.charity.charitysupport.repository;

import java.util.List;

import com.charity.charitysupport.DTO.Organization;
import com.charity.charitysupport.entity.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
    
    @Query("select new com.charity.charitysupport.DTO.Organization(p.organization, sum(p.contribution), count(p.contribution)) from Post as p group by p.organization order by sum(p.contribution) desc")
    List<Organization> getOrganization();
}
