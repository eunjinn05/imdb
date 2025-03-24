package com.eunjinn.blog.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequestDto {
    @NotBlank
    private String memberName;
    @NotBlank
    private String memberEmail;
    @NotBlank
    private String memberPassword;

}
