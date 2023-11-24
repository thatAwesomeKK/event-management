import Organizer from "../../../../components/Dashboard/Organizer"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <Organizer />
        {children}
    </section>
}