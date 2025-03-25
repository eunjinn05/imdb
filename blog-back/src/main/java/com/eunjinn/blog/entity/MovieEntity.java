package com.eunjinn.blog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="movie")
@Table(name="movie")
public class MovieEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movieIdx;
    private String movieName;
    private String movieImage;
    private String moviePlot;
}
