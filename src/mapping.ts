import { BigInt } from "@graphprotocol/graph-ts"
import {
  AdminUpgradeabilityProxy,
  AdminChanged,
  Upgraded
} from "../generated/AdminUpgradeabilityProxy/AdminUpgradeabilityProxy"
import { _AdminChanged, _Upgraded } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
  let adminChanged = _AdminChanged.load(event.params.newAdmin.toHex())

  if (adminChanged == null) {
    adminChanged = new _AdminChanged(event.params.newAdmin.toHex())
    adminChanged.count = BigInt.fromI32(0)
  }

  adminChanged.count = adminChanged.count + BigInt.fromI32(1)
  adminChanged.previousAdmin = event.params.previousAdmin
  adminChanged.newAdmin = event.params.newAdmin
  adminChanged.save()

}

export function handleUpgraded(event: Upgraded): void {
  let upgraded = _Upgraded.load(event.params.implementation.toHex())

  if (upgraded == null) {
    upgraded = new _Upgraded(event.params.implementation.toHex())
    upgraded.count = BigInt.fromI32(0)
  }

  upgraded.count = upgraded.count + BigInt.fromI32(1)
  upgraded.implementation = event.params.implementation
  upgraded.save()
}
