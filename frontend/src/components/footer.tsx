import FlexibleContainer from "@/components/ui/flexible-container";
import { TypographyMuted } from "@/components//ui/typography";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <FlexibleContainer>
            <div>
                <TypographyMuted>
                    Developed by <Link className="underline" to={"https://github.com/leofaraf"}>Leon Farafonov</Link>. Icons by <Link className="underline" to={"https://icons8.com/"}>Icons8</Link>
                </TypographyMuted>
            </div>
        </FlexibleContainer>
    )
}