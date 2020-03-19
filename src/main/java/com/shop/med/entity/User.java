package com.shop.med.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;

/**
 * 登录用户名，包含了角色
 */
@Entity
@Data
@Table(name = "medicineuser")
//@NoArgsConstructor(access = AccessLevel.PRIVATE,force = true)
@NoArgsConstructor
//@RequiredArgsConstructor
public class User implements UserDetails {

    private static final long serialVersionUID=1L;

    public User(String username,String password){
        this.username=username;
        this.password=password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}