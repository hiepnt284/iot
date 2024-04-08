package com.example.iot_backend.repository;

import com.example.iot_backend.entity.Action;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActionRepo extends JpaRepository<Action,Integer> {
    Page<Action> findAllByTimeBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    @Query(value = "SELECT ah.id, ah.device_name, ah.action, ah.time " +
            "FROM history AS ah " +
            "JOIN (SELECT device_name, MAX(time) AS latest_time " +
            "      FROM history " +
            "      WHERE device_name IN ('den', 'quat') " +
            "      GROUP BY device_name) AS subq " +
            "ON ah.device_name = subq.device_name AND ah.time = subq.latest_time", nativeQuery = true)
    List<Action> getLastAction();
}
