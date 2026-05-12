import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Common "../types/common";

module {
  public type AdminState = {
    admins : Set.Set<Common.UserId>;
  };

  public func isAdmin(state : AdminState, caller : Common.UserId) : Bool {
    state.admins.contains(caller);
  };

  public func setFirstAdmin(state : AdminState, caller : Common.UserId) : Bool {
    if (not state.admins.isEmpty()) return false;
    state.admins.add(caller);
    true;
  };

  public func addAdmin(state : AdminState, caller : Common.UserId, newAdmin : Common.UserId) {
    if (not isAdmin(state, caller)) Runtime.trap("Unauthorized");
    state.admins.add(newAdmin);
  };

  public func removeAdmin(state : AdminState, caller : Common.UserId, target : Common.UserId) {
    if (not isAdmin(state, caller)) Runtime.trap("Unauthorized");
    state.admins.remove(target);
  };

  public func listAdmins(state : AdminState) : [Common.UserId] {
    state.admins.toArray();
  };
};
