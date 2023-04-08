export const schema = {
  users: {
    type: "users",
    relationships: {
      memberships: {
        type: "members",
      },
    },
  },
  members: {
    type: "members",
    relationships: {
      user: {
        type: "users",
      },
      account: {
        type: "accounts",
      },
    },
  },
  accounts: {
    type: "accounts",
    relationships: {
      members: {
        type: "members",
      },
    },
  },
  queries: {
    type: "queries",
    relationships: {
      triggers: {
        type: "triggers",
      },
    },
  },
  triggers: {
    type: "triggers",
    relationships: {
      query: {
        type: "queries",
      },
    },
  },
};
