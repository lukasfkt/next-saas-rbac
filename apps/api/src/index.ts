import { defineAbilityFor } from "@saas/auth"

const ability = defineAbilityFor({ id: '1' ,role: "MEMBER" })

console.log(ability.can("manage", "all"))