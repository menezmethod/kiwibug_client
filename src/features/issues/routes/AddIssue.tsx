import { ContentLayout } from '@/components/Layout/ContentLayout'
import IssueForm from '../components/IssueForm'

export const AddIssue = () => {
    return (
        <ContentLayout title="Issue TITLE">
            <IssueForm />
        </ContentLayout>
    )
}
// REMEMBER TO EDIT FORM WITH RESPONSIVE STACK https://mui.com/components/stack/