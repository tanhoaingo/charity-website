package com.charity.charitysupport.repository;

import java.math.BigDecimal;
import java.util.List;

import com.charity.charitysupport.DTO.DonationDto;
import com.charity.charitysupport.DTO.IContributionStatistic;
import com.charity.charitysupport.DTO.SupporterDto;
import com.charity.charitysupport.entity.Donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query("SELECT new com.charity.charitysupport.DTO.SupporterDto(d.user.avatar, d.user.username, d.user.fullname, COUNT(d.amount), SUM(d.amount)) FROM Donation AS d GROUP BY d.user ORDER BY SUM(d.amount) desc")
    List<SupporterDto> getSupporters();

    @Query(value =  "SELECT distinct count(*) over() FROM donation as d, user as u where d.user_id = u.id group by u.id", nativeQuery = true)
    Long getNumberOfSupporter();

    @Query("SELECT SUM(d.amount) FROM Donation as d")
    BigDecimal getSumOfAmount();

    @Query(value = "select date_format(create_at, '%d/%m/%Y') as createAt, sum(amount) as total, count(*) as times from donation where month(create_at) = month(current_date()) group by date_format(create_at, '%d/%m/%Y') order by date_format(create_at, '%d/%m/%Y')", nativeQuery = true)
    List<IContributionStatistic> getContributionStatistics();

    @Query(value =  "SELECT distinct count(*) over() FROM donation as d, user as u where d.user_id = u.id and d.post_id = ?1 group by u.id", nativeQuery = true)
    Long getNumberOfSupporterByPostId(Long id);

    @Query("SELECT SUM(d.amount) FROM Donation as d where d.post.id = ?1")
    BigDecimal getSumOfAmountByPostId(Long id);

    @Query(value = "select date_format(create_at, '%d/%m/%Y') as createAt, sum(amount) as total, count(*) as times from donation as d where month(create_at) = month(current_date()) and d.post_id = ?1 group by date_format(create_at, '%d/%m/%Y') order by date_format(create_at, '%d/%m/%Y')", nativeQuery = true)
    List<IContributionStatistic> getContributionStatisticsByPostId(Long id);

    @Query(value = "select new com.charity.charitysupport.DTO.DonationDto(d.user.username, d.user.fullname, d.user.avatar, d.amount, d.paymentMethod, d.createAt, d.post.title, d.isAnonymous) from Donation as d order by d.createAt desc")
    List<DonationDto> getAllDonation();

    @Query(value = "select new com.charity.charitysupport.DTO.DonationDto(d.user.username, d.user.fullname, d.user.avatar, d.amount, d.paymentMethod, d.createAt, d.post.title, d.isAnonymous) from Donation as d where d.post.id = ?1 order by d.createAt desc")
    List<DonationDto> getAllDonationByPostId(Long postId);
}
