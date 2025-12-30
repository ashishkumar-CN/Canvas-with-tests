package com.yfdecor.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminCartItemResponse {
    private Long id;
    private String userName;
    private String userEmail;
    private ProductResponse product;
    private Integer quantity;
}
