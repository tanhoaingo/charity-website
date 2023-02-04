package com.charity.charitysupport.repository;

import java.util.List;
import java.util.Optional;

import com.charity.charitysupport.DTO.UserStatistic;
import com.charity.charitysupport.DTO.VolunteerStatistic;
import com.charity.charitysupport.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);

    @Query("select new com.charity.charitysupport.DTO.UserStatistic(u.username, u.fullname, u.avatar, u.phoneNumber, u.email, u.donations.size, u.total) from User as u order by u.total desc")
    List<UserStatistic> getUserStatistics();

    @Query("select new com.charity.charitysupport.DTO.VolunteerStatistic(0 ,u.username, u.fullname, u.avatar, u.email, u.times, u.point, u.username) from User as u where u.volunteers.size > 0 order by u.point desc")
    List<VolunteerStatistic> getVolunteerStatistics();

}
