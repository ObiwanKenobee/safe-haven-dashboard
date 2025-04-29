
import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserRole } from "./AuthForm";

interface RoleOption {
  id: UserRole;
  name: string;
  description: string;
}

const roleOptions: RoleOption[] = [
  {
    id: "public",
    name: "Public Visitor",
    description: "View stories, statistics, and donate",
  },
  {
    id: "activist",
    name: "Activist",
    description: "Report trafficking, request help",
  },
  {
    id: "donor",
    name: "Donor",
    description: "View impact, manage donations",
  },
  {
    id: "researcher",
    name: "Researcher",
    description: "Access datasets and insights",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Contribute code, track APIs",
  },
  {
    id: "enforcer",
    name: "Enforcer",
    description: "Access intervention data (role-gated)",
  },
  {
    id: "survivor",
    name: "Survivor",
    description: "Request aid, track case (private)",
  },
];

interface UserRoleSelectorProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

export const UserRoleSelector = ({
  selectedRole,
  onChange,
}: UserRoleSelectorProps) => {
  return (
    <RadioGroup
      value={selectedRole}
      onValueChange={(value) => onChange(value as UserRole)}
      className="grid grid-cols-1 gap-3 md:grid-cols-2"
    >
      {roleOptions.map((option) => (
        <div key={option.id}>
          <RadioGroupItem
            value={option.id}
            id={option.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={option.id}
            className="flex cursor-pointer flex-col rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{option.name}</span>
              <Check className="invisible h-4 w-4 text-primary peer-data-[state=checked]:visible [&:has([data-state=checked])]:visible" />
            </div>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
