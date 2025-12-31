package com.yfdecor.service;

import com.yfdecor.config.JwtProvider;
import com.yfdecor.dto.request.AuthRequest;
import com.yfdecor.dto.request.RegisterRequest;
import com.yfdecor.dto.response.AuthResponse;
import com.yfdecor.dto.response.UserResponse;
import com.yfdecor.model.Profile;
import com.yfdecor.model.User;
import com.yfdecor.repository.ProfileRepository;
import com.yfdecor.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final ProfileRepository profileRepository;
	private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

	@Transactional
	public AuthResponse register(RegisterRequest request) {

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
		}

		User user = User.builder()
				.email(request.getEmail())
				.name(request.getName())
				.password(passwordEncoder.encode(request.getPassword()))
				.role("USER")
				.build();

		user = userRepository.save(user);

		Profile profile = Profile.builder()
				.user(user)
				.build();
		profileRepository.save(profile);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);

		return buildResponse(user, jwt);
	}

	public AuthResponse login(AuthRequest request) {

		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() ->
						new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials")
				);

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
		}

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);

		return buildResponse(user, jwt);
	}

	public UserResponse getMe(String email) {

		User user = userRepository.findByEmail(email)
				.orElseThrow(() ->
						new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
				);

		return UserResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.name(user.getName())
				.role(user.getRole())
				.build();
	}

	private AuthResponse buildResponse(User user, String jwt) {
		return AuthResponse.builder()
				.user(UserResponse.builder()
						.id(user.getId())
						.email(user.getEmail())
						.name(user.getName())
						.role(user.getRole())
						.build())
                .jwt(jwt)
				.build();
	}

	public String encodedPassword(String password){
		return passwordEncoder.encode(password);
	}
}
