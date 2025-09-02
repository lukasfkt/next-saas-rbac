import { InterceptedSheetContent } from '@/components/ui/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { OrganizationForm } from '../../create-organization/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent className="p-5 py-4">
        <SheetHeader>
          <SheetTitle>Create Organization</SheetTitle>
          <SheetDescription>
            Create a new organization to manage your users and roles
          </SheetDescription>
        </SheetHeader>

        <OrganizationForm />
      </InterceptedSheetContent>
    </Sheet>
  )
}
