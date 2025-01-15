import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Users, Target, Flag } from "lucide-react";

type CardHeader = "Total Investors" | "Strike Zone" | "Red Flags";

const getDescription = (header: CardHeader): string => {
    switch (header) {
        case "Total Investors":
            return "Investors in your funding database";
        case "Strike Zone":
            return "Investors matching your criteria";
        case "Red Flags":
            return "Investors with potential concerns";
        default:
            return "";
    }
};

const LemonCard = ({ header, value }: { header: CardHeader, value: any }) => {
    const getIcon = () => {
        switch (header) {
            case "Total Investors":
                return <Users className="h-4 w-4 text-muted-foreground" />;
            case "Strike Zone":
                return <Target className="h-4 w-4 text-muted-foreground" />;
            case "Red Flags":
                return <Flag className="h-4 w-4 text-muted-foreground" />;
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-col p-4 space-y-1.5">
                {getIcon()}
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-sm font-semibold">
                            {header}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            {getDescription(header)}
                        </CardDescription>
                    </div>
                    <div className="text-2xl font-bold -mt-1">{value}</div>
                </div>
            </CardHeader>
        </Card>
    )
}

export default LemonCard;