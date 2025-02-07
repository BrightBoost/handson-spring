package com.example.issuetracker.controller;

import com.example.issuetracker.dto.IssueDTO;
import com.example.issuetracker.model.Issue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

import com.example.issuetracker.service.IssueService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin("*")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping
    public ResponseEntity<List<IssueDTO>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> createIssue(@PathVariable Long userId, @RequestBody Issue issue) {
        Optional<IssueDTO> createdIssue = issueService.createIssue(userId, issue);
        if(createdIssue.isPresent()) {
            return ResponseEntity.ok(createdIssue.get());
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PutMapping("/{issueId}")
    public ResponseEntity<?> updateIssue(@PathVariable Long issueId, @RequestBody Issue issue) {
        Optional<IssueDTO> optionalIssueDTO = this.issueService.updateIssue(issueId, issue);
        if(optionalIssueDTO.isPresent()) {
            return ResponseEntity.ok(optionalIssueDTO.get());
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }
    }
}
