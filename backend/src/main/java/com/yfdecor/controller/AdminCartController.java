package com.yfdecor.controller;

import com.yfdecor.dto.response.AdminCartItemResponse;
import com.yfdecor.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/carts")
@RequiredArgsConstructor
public class AdminCartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<AdminCartItemResponse>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCartItems());
    }
}
