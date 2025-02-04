package com.example.iot_backend.controller;

import com.example.iot_backend.dtoResponse.ActionResponse;
import com.example.iot_backend.entity.Action;
import com.example.iot_backend.service.ActionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Tag(name = "Action")
@RequestMapping("/api")
public class ActionController {
    private final ActionService actionService;

    @GetMapping("/actions")
    @Operation(summary = "Lấy thông tin về các action", description = "Lấy thông tin các action theo điều kiện")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy thành công"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy action", content = @Content)
    })
    public ResponseEntity<ActionResponse> getAllAction(
            @RequestParam(required = false, defaultValue = "1") int pageNo,
            @RequestParam(required = false, defaultValue = "5") int pageSize,
            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "DESC") String sortDir,
            @RequestParam(name = "startDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startDate,
            @RequestParam(name = "endDate", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  LocalDateTime endDate,
            @RequestParam(required = false, defaultValue = "all") String device,
            @RequestParam(required = false,defaultValue = "all") String state
    ){
        ActionResponse actionResponse = actionService.getAllAction(pageNo,pageSize,startDate,endDate,sortBy,sortDir, device, state);


        return new ResponseEntity<>(actionResponse, HttpStatus.OK);
    }

    @PostMapping("/action")
    @Operation(summary = "Gửi request action")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Gửi thành công"),
            @ApiResponse(responseCode = "400", description = "Gửi không thành công", content = @Content)
    })
    public ResponseEntity<?> sendAction(@RequestBody Action action){
        actionService.sendAction(action);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lastaction")
    @Operation(summary = "Lấy thông tin cuối cùng của mỗi thiết bị")
    public ResponseEntity<List<Action>> getLastAction(){
        List<Action> actions =  actionService.getLastAction();
        return  new ResponseEntity<>(actions, HttpStatus.OK);
    }
}
