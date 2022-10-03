global class StripeCard {
    private static final String SERVICE_URL = 'https://api.stripe.com/v1/customers/';

    global String stripeType;
    global String country;
    global Integer exp_month;
    global String fingerprint;
    global Integer exp_year;
    global String last4;
    global String stripeObject;
    global String id;
    global String name;
    global String customer_id;
    
    global Date expirationDate {
        get {
            Date d = Date.newInstance(this.exp_year, this.exp_month, Date.daysInMonth(this.exp_year, this.exp_month));
            return d;
        }
    }

    global static StripeCard create(String customerId, String token) {
        return null;
    }

    public static StripeCard parse(String json) {
        json = StripeUtil.cleanJson(json);
        return (StripeCard) System.JSON.deserialize(json, StripeCard.class);
    }
    
}