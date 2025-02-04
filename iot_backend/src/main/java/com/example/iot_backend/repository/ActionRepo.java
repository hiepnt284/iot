package com.example.iot_backend.repository;

import com.example.iot_backend.entity.Action;
import com.example.iot_backend.entity.ActionEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActionRepo extends JpaRepository<Action,Integer> {
    @Query("select a from Action a WHERE a.time BETWEEN :startDate AND :endDate")
    Page<Action> getAllAction(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    //select a from Action a WHERE a.time BETWEEN :startDate AND :endDate AND a.deviceName=:device
    Page<Action> findAllByTimeBetweenAndDeviceNameEqualsIgnoreCase(LocalDateTime startDate, LocalDateTime endDate, String device, Pageable pageable);

    @Query("select a from Action a WHERE a.time BETWEEN :startDate AND :endDate AND a.action=:state")
    Page<Action> findAllByTimeBetweenAndActionEquals(LocalDateTime startDate, LocalDateTime endDate, ActionEnum state, Pageable pageable);
    @Query("select a from Action a WHERE a.time BETWEEN :startDate AND :endDate AND a.action=:state AND a.deviceName=:device")
    Page<Action> findAllByTimeBetweenAndDeviceNameEqualsIgnoreCaseAndActionEquals(LocalDateTime startDate, LocalDateTime endDate, String device, ActionEnum state, Pageable pageable);
    @Query(value = "SELECT ah.id, ah.device_name, ah.action, ah.time " +
            "FROM history AS ah " +
            "JOIN (SELECT device_name, MAX(time) AS latest_time " +
            "      FROM history " +
            "      WHERE device_name IN ('den', 'quat') " +
            "      GROUP BY device_name) AS subq " +
            "ON ah.device_name = subq.device_name AND ah.time = subq.latest_time", nativeQuery = true)
    List<Action> getLastAction();
}
