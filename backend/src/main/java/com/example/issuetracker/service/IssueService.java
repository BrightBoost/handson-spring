package com.example.issuetracker.service;

import com.example.issuetracker.dto.IssueDTO;
import com.example.issuetracker.model.Issue;
import com.example.issuetracker.model.User;
import com.example.issuetracker.repository.IssueRepository;
import com.example.issuetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;

    public IssueService(IssueRepository issueRepository, UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
    }

    public List<IssueDTO> getAllIssues() {
        return issueRepository.findAll()
                .stream()
                .map(IssueDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<IssueDTO> updateIssue(Long issueId, Issue updatedIssue) {
        Optional<Issue> existingIssue = this.issueRepository.findById(issueId);
        if(existingIssue.isPresent()) {
            Issue issue = existingIssue.get();
            issue.setDescription(updatedIssue.getDescription());
            issue.setCategory(updatedIssue.getCategory());
            return Optional.of(new IssueDTO(issueRepository.save(issue)));
        } else {
            return Optional.empty();
        }
    }

    public Optional<IssueDTO> createIssue(Long userId, Issue issue) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            issue.setUser(userOptional.get());
            return Optional.of(new IssueDTO(issueRepository.save(issue)));
        }
        return Optional.empty();
    }
}
