import * as internalIp from "internal-ip";
import network from "@ostwindli/common";

export const getIpV4 = internalIp.v4.sync;
export const getIpV6 = internalIp.v6.sync;
export const getPublicNetworkIp = network.getPublicNetworkIp;
