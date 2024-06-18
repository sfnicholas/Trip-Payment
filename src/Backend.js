import * as FirebaseConnection from "./firebase-connection"; 

/*
  /trips/{tripId}
  - name: "Trip to Vegas"
  - startDate: "2024-01-01"
  - endDate: "2024-01-05"
  - participants: ["A", "B", "C"]
*/
// export const createTrip = async (name = "", startDate = "", endDate = "", participants = []) => {
//   try {
//     const tripDetails = {
//       name: name,
//       startDate: startDate,
//       endDate: endDate,
//       participants: participants
//     };
//     trip_id =  await FirebaseConnection.createTrip(tripDetails);
//     console.log("Trip created successfully");
//     return trip_id;
//   } catch (error) {
//     console.error("Error creating trip:", error);
//   }
// }

/**
 * Updates the specified fields in a trip document if they are provided.
 * @param {string} tripId - The ID of the trip document. (required)
 * @param {string} name - The new name of the trip. (not required)
 * @param {string} startDate - The new start date of the trip. (not required)
 * @param {string} endDate - The new end date of the trip. (not required)
 * @param {string[]} participants - The new list of participants in the trip. (not required)
 * @throws {Error} If the trip ID is not provided, an error is thrown with a message.
 */
export const updateTripFields = async (tripId, name, startDate, endDate, participants) => {
  try {
    if (!tripId) {
      throw new Error("Trip ID is required");
    }
    const updates = {};
    if (name !== undefined && name !== null) updates.name = name;
    if (startDate !== undefined && startDate !== null) updates.startDate = startDate;
    if (endDate !== undefined && endDate !== null) updates.endDate = endDate;
    if (participants !== undefined && participants !== null) updates.participants = participants;
    await FirebaseConnection.updateTripFields(tripId, updates);
    console.log("Trip details updated successfully");s
  } catch (error) {
    console.error("Error updating trip details:", error);
  }
}

/*
487-(487-487*0.1)(1-88%)+487*0.1=483.104
Discount (平咗幾多)=(original-tax)(1-discount percentage)
Tax=original*tax percentage
Final=original-discount+tax

  /trips/{tripId}/expenses/{expenseId}
    - title: "Dinner at XYZ"
    - payed_total_amonut: 80
    - payer: "A"
    - people_involved: ["A", "B", "C"]
    - payment_option: "equal distribution" (default) | "exact amount simplify version" | exact amount detail version
    - date: "2024-01-02"
    - self_claimed_is_complete = true | false
    - is_completed  = true | false
    - time_of_creation: "2024-01-02 12:00:00"
    - tax_percentage: 10
    - tip_percentage: 0
    - discount_percentage: 0
    - category:   ["food", "transporation", "entertainment", "resort", "shopping", "other"] +add new category
    - notes: "Some notes"
    - simplify_verion:
        {
        - is_after_discount: true
        - is_after_tips: true
        - is_after_tax: true
        - individual_money: {
            "A": 30,
            "B": 30,
            "C": 30
          }
        }
    - detail_version: {
      - is_after_discount: true
      - is_after_tips: true
      - is_after_tax: true
      - items: 
        {
          "dish1": {
              "price": 10,
              "people_involve": "A, B, C"
              "after_tax_tip_discount_total": 11,
              "each_people_pay": 3.67,
          },
          "dish2": {
              "price": 20,
              "people_involve": "A, B, C"
              "after_tax_tip_discount_total": 11,
              "each_people_pay": 3.67,
          }
        }
    }
    - individual_money_summary: {
        "A": 40,
        "B": 40,
        "C": 40
        "Sum": 80
      }
*/

export const createExpenses = async (name = "", startDate = "", endDate = "", participants = []) => {
  try {
    const tripDetails = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      participants: participants
    };
    await FirebaseConnection.createTrip(tripDetails);
    console.log("Trip created successfully");
  } catch (error) {
    console.error("Error creating trip:", error);
  }
}

/*
  /trips/{tripId}/summaries
    {A: {
      - owes: {
          "B": 30,
          "C": 70
        }
      - owedBy: {
          "B": 50,
          "C": 20
        }
      }
    }, 
    B: {
      - owes: {
          "A": 50,
          "C": 20
        }
      - owedBy: {
          "A": 30,
          "C": 70
        }
      }
    }
  }

  /trips/{tripId}/people_expenses/{userId}
    - reference: /trips/{tripId}/expenses/{expenseId}
    - amount: 50
    - title: "Dinner at XYZ"


  /trips/{tripId}/default_settings
    - tax_percentage: 10
    - tip_percentage: 0
    - discount_percentage: 0
    - currency: "YAN"
    - categories: ["food", "transporation", "entertainment", "resort", "shopping"]
*/