use pwhash::bcrypt;

pub fn hash(pass: String) -> String {
    bcrypt::hash(pass).unwrap()
}

pub fn verify(pass: String, hash: String) -> bool {
    bcrypt::verify(pass, hash.as_str())
}