package com.charity.charitysupport.entity;

import static java.util.Collections.singletonList;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(unique = true)
        private String username;
        private String password;
        private String fullname;
        @Column(unique = true)
        private String email;
        @Column(unique = true)
        private String phoneNumber;
        private String address = "";
        private String description = "";
        private BigDecimal total = BigDecimal.valueOf(0L);
        private boolean enable;
        private String role = "USER";
        private String avatar;
        private Integer point = 0;
        private Integer times = 0;

        @OneToMany(mappedBy = "user")
        @JsonManagedReference
        private List<Volunteer> volunteers;

        @OneToMany(mappedBy = "user")
        @JsonManagedReference
        private List<Donation> donations;

        @OneToMany(mappedBy = "poster")
        @JsonManagedReference
        private List<Post> posts;

        @OneToOne(mappedBy = "user")
        private VerificationToken verificationToken;

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
                return singletonList(new SimpleGrantedAuthority(this.role));
        }

        @Override
        public boolean isAccountNonExpired() {
                return this.enable;
        }

        @Override
        public boolean isAccountNonLocked() {
                return this.enable;
        }

        @Override
        public boolean isCredentialsNonExpired() {
                return this.enable;
        }

        @Override
        public boolean isEnabled() {
                return this.enable;
        }
}
