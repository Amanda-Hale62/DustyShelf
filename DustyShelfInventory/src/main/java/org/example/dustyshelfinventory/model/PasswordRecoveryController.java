package org.example.dustyshelfinventory.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PasswordRecoveryController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/recover-password")
    public String recoverPassword(@RequestBody PasswordRecoveryRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user != null) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            return "Password reset successful!";
        } else {
            return "User not found!";
        }
    }
}

class PasswordRecoveryRequest {
    private String username;
    private String newPassword;

    public CharSequence getNewPassword() {
        return null;
    }

    public String getUsername() {
        return null;
    }

    // Getters and setters...
}
