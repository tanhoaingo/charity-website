package com.charity.charitysupport.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    private String title;
    private String organization;
    private String type;
    private Date postDate;
    private Date expirationDate;
    private BigDecimal contribution = BigDecimal.valueOf(0);
    private BigDecimal expectation;

    @ManyToOne(fetch = FetchType.LAZY)
    private User poster; 

    @OneToMany(mappedBy = "post")
    private List<Donation> donations;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<Image> images;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<Volunteer> volunteers;
}
