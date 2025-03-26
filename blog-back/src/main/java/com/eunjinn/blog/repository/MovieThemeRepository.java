package com.eunjinn.blog.repository;

import com.eunjinn.blog.entity.MovieThemeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieThemeRepository extends JpaRepository<MovieThemeEntity, Integer> {
    List<MovieThemeEntity> findByOrderByThemeIdxAsc();
}
