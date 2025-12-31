package com.yfdecor.controller;

import com.yfdecor.dto.request.OrderRequest;
import com.yfdecor.dto.response.OrderResponse;
import com.yfdecor.model.User;
import com.yfdecor.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;

    @PostMapping
	public ResponseEntity<OrderResponse> placeOrder(@AuthenticationPrincipal User user,
            @RequestBody OrderRequest request) {
		OrderResponse response = orderService.placeOrder(user, request);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<OrderResponse>> getOrderHistory(@PathVariable Long userId) {
		List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
		OrderResponse response = orderService.getOrderByIdAdmin(id);
		return ResponseEntity.ok(response);
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long id,
			@RequestParam String status) {
		OrderResponse response = orderService.updateOrderStatus(null, id, status);
		return ResponseEntity.ok(response);
	}
}
