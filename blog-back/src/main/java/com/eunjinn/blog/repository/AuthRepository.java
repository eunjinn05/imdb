package com.eunjinn.blog.repository;

import com.eunjinn.blog.entity.AuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<AuthEntity, Integer> {

    boolean existsByMemberEmail(String email);
    AuthEntity findByMemberEmail(String email);
}
