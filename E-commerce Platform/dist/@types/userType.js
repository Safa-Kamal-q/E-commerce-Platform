export var NSUser;
(function (NSUser) {
    let UserType;
    (function (UserType) {
        UserType["seller"] = "seller";
        UserType["buyer"] = "buyer";
        UserType["admin"] = "admin";
        UserType["guest"] = "guest";
    })(UserType = NSUser.UserType || (NSUser.UserType = {}));
    let AccountType;
    (function (AccountType) {
        AccountType["current"] = "current";
        AccountType["saving"] = "saving";
    })(AccountType = NSUser.AccountType || (NSUser.AccountType = {}));
})(NSUser || (NSUser = {}));
//# sourceMappingURL=userType.js.map