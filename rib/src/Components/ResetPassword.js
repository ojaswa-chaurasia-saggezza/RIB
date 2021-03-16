import React from 'react';
import '../CSS/style.css';
import '../CSS/ErrorStyling.css';

export default function ResetPassword() {

    return (
        <div class="content">
            <section class="trasfer-beneficiary">
                <h1 class="title">Reset Password</h1>
                <div class="container">
                    <div class="transfer-form row">

                        <div class="form-field col-lg-6">
                            <input id="old-password" class="input-text" type="text" name="" />
                            <label for="old-password" class="label text-primary">Old Password</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input id="new-password" class="input-text" type="text" name="" />
                            <label for="new-password" class="label text-primary">New Password</label>
                        </div>
                        <div class="form-field col-lg-6">
                            <input id="confirm-password" class="input-text" type="text" name="" />
                            <label for="confirm-password" class="label text-primary">Confirm Password</label>
                        </div>
                        <div class="form-field col-lg-12">
                            <input class="submit-btn bg-success" type="submit" value="submit" name="" />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
