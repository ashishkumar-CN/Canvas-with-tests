import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CheckoutStepperProps {
    activeStep: number;
}

const steps = [
    { id: 1, name: "SHOPPING CART", path: "/cart" },
    { id: 2, name: "CHECKOUT DETAILS", path: "/checkout" },
    { id: 3, name: "ORDER COMPLETE", path: "/order-complete" },
];

const CheckoutStepper = ({ activeStep }: CheckoutStepperProps) => {
    return (
        <section className="bg-secondary/30 py-8 border-b border-border/40 backdrop-blur-sm">
            <div className="container">
                <div className="flex items-center justify-center gap-4 md:gap-8 text-sm">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center gap-4 md:gap-8">
                            <Link
                                to={step.path}
                                className="flex items-center gap-3 group transition-all cursor-pointer"
                            >
                                <span
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm",
                                        activeStep === step.id
                                            ? "bg-primary text-primary-foreground scale-110 shadow-primary/20"
                                            : "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                                    )}
                                >
                                    {step.id}
                                </span>
                                <span
                                    className={cn(
                                        "hidden sm:inline tracking-widest text-[10px] font-bold transition-all duration-300",
                                        activeStep === step.id
                                            ? "text-foreground"
                                            : "text-primary/80 group-hover:text-primary"
                                    )}
                                >
                                    {step.name}
                                </span>
                            </Link>
                            {index < steps.length - 1 && (
                                <ChevronRight className="h-5 w-5 text-muted-foreground/30" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CheckoutStepper;
