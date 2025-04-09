import { defineAbilityFor } from "@saas/auth"

const ability = defineAbilityFor({ role: "MEMBER" })

console.log(ability.can("manage", "all"))