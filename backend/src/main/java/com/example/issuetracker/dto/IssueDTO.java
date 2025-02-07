package com.example.issuetracker.dto;

import com.example.issuetracker.model.Issue;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueDTO {
    private Long id;
    private String description;
    private String category;
    private Long userId;
    private String userName;

    public IssueDTO(Issue issue) {
        this.id = issue.getId();
        this.description = issue.getDescription();
        this.category = issue.getCategory();
        this.userId = issue.getUser().getId();
        this.userName = issue.getUser().getName();
    }
}
