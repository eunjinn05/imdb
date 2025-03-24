package com.eunjinn.blog.entity;

import com.eunjinn.blog.dto.request.auth.JoinRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="member")
@Table(name="member")
public class AuthEntity {
    @Id
    private String memberEmail;
    private String memberName;
    private String memberPassword;

    public AuthEntity(JoinRequestDto dto) {
        this.memberName = dto.getMemberName();
        this.memberEmail = dto.getMemberEmail();
        this.memberPassword = dto.getMemberPassword();
    }



}
