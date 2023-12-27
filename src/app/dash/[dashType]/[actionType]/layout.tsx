import Organizer from "../../../../components/Dashboard/OrganizerNav"

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