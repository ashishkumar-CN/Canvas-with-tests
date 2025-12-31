import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders, updateAdminOrderStatus, fetchAdminCarts } from '@/redux/admin/action';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, ShoppingCart } from "lucide-react";
import { toast } from 'sonner';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { orders = [], carts = [], loading } = useSelector((state: any) => state.admin);
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        dispatch(fetchAdminOrders());
        dispatch(fetchAdminCarts());
    }, [dispatch]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await dispatch(updateAdminOrderStatus(orderId, newStatus) as any);
            toast.success(`Order ${orderId} updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    // Calculate Metrics
    const totalRevenue = orders.reduce((acc: number, order: any) => {
        if (['CONFIRMED', 'SHIPPED', 'DELIVERED'].includes(order.status)) {
            return acc + (order.totalAmount || 0) + (order.deliveryCharge || 0);
        }
        return acc;
    }, 0);

    const pendingOrders = orders.filter((o: any) => o.status === 'PENDING').length;
    const totalOrders = orders.length;
    const activeCartsCount = carts.length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'CONFIRMED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'SHIPPED': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'DELIVERED': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'CANCELLED': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    if (loading && orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold font-display tracking-tight text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your store's orders and monitor active customer sessions.</p>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</p>
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</h3>
                            <p className="text-xs text-green-500 font-medium">From successful orders</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Orders</p>
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Package className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold">{totalOrders}</h3>
                            <p className="text-xs text-muted-foreground">Lifetime volume</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Tasks</p>
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Loader2 className="h-5 w-5 text-yellow-500" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold">{pendingOrders}</h3>
                            <p className="text-xs text-yellow-600 font-medium">Orders needing confirmation</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50 bg-card shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Carts</p>
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <ShoppingCart className="h-5 w-5 text-purple-500" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-bold">{activeCartsCount}</h3>
                            <p className="text-xs text-muted-foreground">Potential sales in progress</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="orders" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                    <TabsTrigger value="orders" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Orders
                    </TabsTrigger>
                    <TabsTrigger value="carts" className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Active Carts
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                    <Card className="border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border">
                            <CardTitle>Manage Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-b border-border bg-muted/20">
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Total Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order: any) => (
                                        <TableRow key={order.id} className="hover:bg-muted/5 border-b border-border last:border-0">
                                            <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{order.address?.name || 'Unknown'}</span>
                                                    <span className="text-xs text-muted-foreground">{order.address?.phone}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">₹{order.totalAmount + order.deliveryCharge}</TableCell>
                                            <TableCell>
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={getStatusColor(order.status)}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    defaultValue={order.status}
                                                    onValueChange={(val) => handleStatusChange(order.id, val)}
                                                >
                                                    <SelectTrigger className="w-[140px] h-8 text-xs border-border bg-card">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PENDING">PENDING</SelectItem>
                                                        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                                                        <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                                                        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="carts">
                    <Card className="border-border shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b border-border">
                            <CardTitle>Active User Carts</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent border-b border-border bg-muted/20">
                                        <TableHead>User</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {carts.map((item: any) => (
                                        <TableRow key={item.id} className="hover:bg-muted/5 border-b border-border last:border-0">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{item.userName}</span>
                                                    <span className="text-xs text-muted-foreground">{item.userEmail}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <img src={item.product.imageUrl} className="h-8 w-8 rounded object-cover border border-border" alt="" />
                                                    <span>{item.product.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell className="font-semibold">₹{item.product.price * item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                    {carts.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                No active carts found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
