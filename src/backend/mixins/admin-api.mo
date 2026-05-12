import AdminLib "../lib/admin";
import Common "../types/common";

mixin (adminState : AdminLib.AdminState) {
  public shared ({ caller }) func setFirstAdmin() : async Bool {
    AdminLib.setFirstAdmin(adminState, caller);
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdmin(adminState, caller);
  };

  public shared ({ caller }) func addAdmin(newAdmin : Common.UserId) : async () {
    AdminLib.addAdmin(adminState, caller, newAdmin);
  };

  public shared ({ caller }) func removeAdmin(target : Common.UserId) : async () {
    AdminLib.removeAdmin(adminState, caller, target);
  };

  public query func listAdmins() : async [Common.UserId] {
    AdminLib.listAdmins(adminState);
  };
};
