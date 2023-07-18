"use strict";
// import { Request, Response } from "express";
// import { accountsRepository } from "../repositories/accountsRepositories";
// import { transactionsRepository } from "../repositories/transactionsRepositories";
// export class TransactionsController {
//     async create(request: Request, response: Response) {
//         const {
//             debitedAccountId,
//             creditedAccountId,
//             amount,
//         } = request.body;
//         if (!debitedAccountId || !creditedAccountId) {
//             return response.status(400).json({ error: "Debited or credited account is missing" });
//         }
//         if (!amount) {
//             return response.status(400).json({ error: "Amount is missing" });
//         }
//         try {
//             const debitedAccount = await accountsRepository.findOneBy({ id: debitedAccountId });
//             const creditedAccount = await accountsRepository.findOneBy({ id: creditedAccountId });
//             if (!debitedAccount || !creditedAccount) {
//                 return response.status(400).json({ error: "Debited or credited account is missing" });
//             }
//             if (debitedAccount.balance < amount) {
//                 return response.status(400).json({ error: "Insufficient balance" });
//             }
//             debitedAccount.balance -= amount;
//             creditedAccount.balance += amount;
//             await accountsRepository.save(debitedAccount);
//             await accountsRepository.save(creditedAccount);
//             // const newTransaction = transactionsRepository.create({
//             //     debitedAccountId:  debitedAccount,
//             //     creditedAccountId: creditedAccount,
//             //     value: amount
//             // });
//             // await transactionsRepository.save(newTransaction);
//             return response.status(201).json({ message: "Transaction created" });
//         }
//         catch (error) {
//             console.log(error);
//             return response.status(500).json({ message: "internal server error" });
//         }
//     }
// }
