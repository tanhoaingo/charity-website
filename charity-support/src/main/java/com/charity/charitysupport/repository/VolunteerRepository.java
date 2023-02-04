package com.charity.charitysupport.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.charity.charitysupport.DTO.VolunteerRegistration;
import com.charity.charitysupport.entity.Volunteer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

    @Query(value = "SELECT * FROM VOLUNTEER WHERE USER_ID = ?1 AND POST_ID = ?2", nativeQuery = true)
    Optional<Volunteer> findByUserAndPost(Long userId, Long postId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM VOLUNTEER WHERE USER_ID = ?1 AND POST_ID = ?2", nativeQuery = true)
    void deleteByUserAndPost(Long userId, Long postId);

    @Query(value = "SELECT * FROM VOLUNTEER WHERE STATUS = ?1 AND POST_ID = ?2", nativeQuery = true)
    List<Volunteer> findByStatusAndPost(String status, Long postId);

    @Query(value = "SELECT distinct count(*) over() FROM Volunteer as v where v.status = 'ĐÃ TRỞ THÀNH TÌNH NGUYỆN VIÊN' group by v.user_id", nativeQuery = true)
    Long getNumberOfVolunteer();

    @Query("SELECT count(v.user) FROM Volunteer as v where v.post.id = ?1 group by v.user")
    Long getNumberOfVolunteerByPostId(Long id);
    
    @Query(value = "select v.id as id, u.username as username, u.avatar as avatar, u.fullname as fullname, date_format(v.create_at, '%d/%m/%Y') as createAt, p.title as title, u.email as email, u.phone_number as phoneNumber, v.status as status from volunteer as v, user as u, post as p where v.user_id = u.id and v.post_id = p.id", nativeQuery = true)
    List<VolunteerRegistration> getVolunteers();

}
